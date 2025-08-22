export default class WorkerManager {
  readonly #workers = new Set<Worker>();
  readonly make: () => Worker;

  constructor({ maker }: { maker: () => Worker }) {
    this.make = maker;
  }

  register() {
    const w = this.make();
    this.#workers.add(w);
    return w;
  }

  kill(w: Worker) {
    w.terminate();
    this.#workers.delete(w);
  }

  killAll() {
    for (const w of this.#workers) {
      w.terminate();
    }
    this.#workers.clear();
  }
}
