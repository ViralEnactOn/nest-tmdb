import { Database } from 'interfaces/sample';
import { Kysely } from 'kysely';
import { DB } from 'src/config/types';

export type Database = Kysely<DB>;
