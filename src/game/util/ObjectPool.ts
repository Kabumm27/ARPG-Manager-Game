export class ObjectPool<T> {
    public objects: T[];

    public constructor(size: number) {
        this.objects = new Array(size);
    }

    public take() {

    }

    public release(object: T) {

    }
}