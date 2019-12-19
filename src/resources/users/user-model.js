const db = require('../../../data/dbConfig');

async function find() {
  const users = await db('users').select(
    'id',
    'first_name',
    'last_name',
    'password',
    'email',
    'location',
    'role_id',
  );
  return users;
}

async function findBy(email) {
  let user = await db('users')
    .where(email)
    .first();

  if (user.role_id) {
    const { id } = user;

    if (user.role_id === 1) {
      user = await db('users')
        .join('students', 'students.user_id', '=', 'users.id')
        .where('users.id', '=', id)
        .first();
    } else {
      user = await db('users')
        .join('coaches', 'coaches.user_id', '=', 'users.id')
        .where('users.id', '=', id)
        .first();
    }
    return user;
  }

  return user;
}

async function findById(id) {
  const user = await db('users')
    .where({ id })
    .first();

  return user;
}

async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findById(id);
}

async function remove(id) {
  const user = await findById(id);
  if (user) {
    const deleted = await db('users')
      .where({ id })
      .del();
    if (deleted) {
      return user;
    }
  }
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
};
