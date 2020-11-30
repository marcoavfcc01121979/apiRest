import House from '../models/House'
import User from '../models/User'

class HouseController{
  // list house cpm status true
  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status })
    return res.status(200).json(houses)
  }

  // create house
  async store(req, res) {
    //console.log(req.body);
    //console.log(req.file);
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.status(201).json(house);
  }

  //update house
  async update(req, res) {
    const { filename } = req.file;
    const { id } = req.params;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(id);

    if(String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Não autorizado!' })
    }

    const houses = await House.updateOne({ _id: id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    })

    //console.log(houses)
    return res.status(200).json(houses)
  }

  async destroy(req, res) {
    const { id } = req.params;

    const user = await User.findById(user_id);
    const house = await House.findById(id);

    if(String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Não autorizado!' })
    }

    await House.findByIdAndDelete({ _id: id })

    return res.status(200).json(`Casa de id: ${id} deletado com sucesso.`)
  }
}

export default new HouseController();