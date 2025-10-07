import {Knex} from "knex";

interface Writer<T> {
    create(item: T): Promise<T>
    update(id: string, item: Partial<T>): Promise<boolean>
    delete(id: string): Promise<boolean>
}

interface Reader<T> {
    find(item: Partial<T>): Promise<T[]>
    findOne(id: string | number): Promise<T>
}

type BaseRepository<T> = Writer<T> & Reader<T>

export abstract class Repository<T> implements BaseRepository<T>{
    protected abstract tableName: string;

    constructor(protected db: Knex) {
    }

    public get qb(): Knex.QueryBuilder {
        return this.db(this.tableName);
    }

    update(id: string, item: Partial<T>): Promise<boolean> {
        throw new Error("Not implemented")
    }

    delete(id: string): Promise<boolean> {
        throw new Error("Not implemented")
    }

    find(item: Partial<T>): Promise<T[]> {
        throw new Error("Not implemented")
    }

    list(whereClause = {}): Promise<T[]> {
        return this.qb.select('*').where(whereClause);
    }

    create(data: T): Promise<T> {
        return this.qb.insert(data).returning('*').then(rows => rows[0]);
    }

    findOne(id: string | number): Promise<T> {
        return this.qb.select('*').where({id}).first();
    }
}