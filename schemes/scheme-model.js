const db = require('../data/db-config.js');

module.exports = {
    getSchemes,
    getById,
    findSteps,
    add,
    update,
    remove,
  };
  
  function getSchemes() {
    return db('schemes');
  }

  function getById(id) {
    return db('schemes').where({ id });
  }

  function add(scheme) {
    return db('schemes').insert(scheme);
  }

  function findSteps(id) {
    return db('schemes as s')
      .innerJoin('steps as st', 's.id', '=', 'st.scheme_id')
      .select('s.id', 's.scheme_name', 'st.step_number', 'st.instructions')
      .where({ scheme_id: id });
  }
  
  function update(changes, id) {
    return db('schemes')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('schemes')
      .where({ id })
      .del();
  }