import uuid from 'uuid/v4';
class Database{
  constructor() {
    this.__db = [
      {
        id: uuid(),
        name: 'Read at night',
        description: 'Read react native',
        date:  '2019-09-19',
        time: '20:20PM'
      },
      {
        id: uuid(),
        name: 'Write a new program',
        description: 'Create something iconic',
        date:  '2019-09-19',
        time: '20:20PM'
      },
      {
        id: uuid(),
        name: 'Make lunch',
        description: 'Friends are coming',
        date:  '2019-09-19',
        time: '20:20PM'
      },
      {
        id: uuid(),
        name: 'Sleep after lunch',
        description: 'so you can code at night',
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
    this.__db.splice(idx,1);
  }
}

const database = new Database();
export default database;