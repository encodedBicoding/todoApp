import uuid from 'uuid/v4';
class Database{
  constructor() {
    this.__db = [
      {
        id: uuid(),
        name: 'Read at night',
        description: 'Read react native',
        status: 'undone',
        date:  '2019-09-19',
        time: '20:20PM'
      }
    ]
  }
  add(data){
    this.__db.push(data)
  }
  get(){
    return this.__db;
  }
  getByid(obj){
    return this.__db.findIndex((ent) => ent.id === obj.id);
  }
  findAndUpdate(obj){
    const idx = this.__db.findIndex((ent) => ent.id === obj.id);
    delete this.__db[idx];
    this.__db[idx] = obj;
  }
  delete(obj){
    const idx = this.__db.findIndex((ent) => ent.id === obj.id);
    if(idx===-1) return;
    delete this.__db[idx];
  }
}

const database = new Database();
export default database;