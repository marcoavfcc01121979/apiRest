import House from '../models/House'

class HouseController{
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
}

export default new HouseController();