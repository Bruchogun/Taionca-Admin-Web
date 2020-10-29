exports.up = pgm => pgm.sql(`INSERT INTO permissions (name) VALUES ('users_create'),('users_read'),('users_update'),('users_delete');`);
exports.down = pgm => pgm.sql(`DELETE FROM permissions WHERE name IN ('users_create','users_read','users_update','users_delete')`);