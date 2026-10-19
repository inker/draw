import workerRpc from '#utils/worker/rpc';
import { type MessageForWorker } from '#utils/worker/messages';

/**
 * Stands in for a worker that runs exposeWorker,
 * which Node has no way of loading.
 * Without a function it never answers.
 */
class FakeWorker extends EventTarget {
  isTerminated = false;

  readonly #func: ((...args: never[]) => unknown) | undefined;

  constructor(func?: (...args: never[]) => unknown) {
    super();
    this.#func = func;
  }

  postMessage(_: unknown, [port]: readonly MessagePort[]) {
    const func = this.#func;
    if (!func) {
      return;
    }
    port.addEventListener(
      'message',
      ({ data }: MessageEvent<MessageForWorker<never[]>>) => {
        try {
          port.postMessage({
            status: 'result',
            id: data.id,
            result: func(...data.args),
          });
        } catch (err) {
          port.postMessage({
            status: 'error',
            id: data.id,
            error: err,
          });
        }
      },
    );
    port.start();
  }

  terminate() {
    this.isTerminated = true;
  }
}

describe('workerRpc', () => {
  const lifetime = new AbortController();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    lifetime.abort();
  });

  it('resolves with what the worker returns', async () => {
    const call = workerRpc<(a: number, b: number) => number>(
      new FakeWorker((a: number, b: number) => a + b) as unknown as Worker,
      lifetime.signal,
    );
    await expect(call(2, 3)).resolves.toBe(5);
  });

  it('rejects with what the worker throws', async () => {
    const call = workerRpc<() => void>(
      new FakeWorker(() => {
        throw new Error('No valid schedule');
      }) as unknown as Worker,
      lifetime.signal,
    );
    await expect(call()).rejects.toThrow('No valid schedule');
  });

  it('terminates the worker & rejects pending & later calls on abort', async () => {
    const controller = new AbortController();
    const worker = new FakeWorker();
    const call = workerRpc<() => void>(
      worker as unknown as Worker,
      controller.signal,
    );
    const pending = call();
    controller.abort(new Error('Left the page'));
    await expect(pending).rejects.toThrow('Left the page');
    await expect(call()).rejects.toThrow('Left the page');
    expect(worker.isTerminated).toBe(true);
  });

  it('rejects pending calls when the worker fails', async () => {
    const worker = new FakeWorker();
    const call = workerRpc<() => void>(
      worker as unknown as Worker,
      lifetime.signal,
    );
    const pending = call();
    worker.dispatchEvent(new Event('error'));
    await expect(pending).rejects.toThrow('The worker failed');
    expect(worker.isTerminated).toBe(true);
  });

  it('rejects pending calls when a reply cannot be read', async () => {
    vi.spyOn(globalThis, 'MessageChannel');
    const worker = new FakeWorker();
    const call = workerRpc<() => void>(
      worker as unknown as Worker,
      lifetime.signal,
    );
    const pending = call();
    const [channel] = vi.mocked(MessageChannel).mock.instances;
    channel.port1.dispatchEvent(new Event('messageerror'));
    await expect(pending).rejects.toThrow(
      'The reply from the worker could not be read',
    );
    expect(worker.isTerminated).toBe(true);
  });
});
