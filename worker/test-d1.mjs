// D1 de prueba sobre SQLite en memoria (node:sqlite), con las migraciones reales del proyecto.
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export function d1(files = ['0002_jossue_ai.sql', '0003_whatsapp.sql', '0004_ai_guard.sql']) {
	const db = new DatabaseSync(':memory:');
	for (const file of files) db.exec(readFileSync(new URL(`../migrations/${file}`, import.meta.url), 'utf8'));
	const statement = (sql) => {
		let params = [];
		return {
			bind(...values) {
				params = values;
				return this;
			},
			async first() {
				return db.prepare(sql).get(...params) ?? null;
			},
			async all() {
				return { results: db.prepare(sql).all(...params) };
			},
			async run() {
				const info = db.prepare(sql).run(...params);
				return { success: true, meta: { changes: Number(info.changes) } };
			},
		};
	};
	return {
		raw: db,
		prepare: statement,
		async batch(statements) {
			for (const item of statements) await item.run();
		},
	};
}
