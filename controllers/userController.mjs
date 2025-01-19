
export const getUser = async (req, res) => {
  const { username } = req.params;
  const collection = req.app.get('collection');
  
  try {
    const result = await collection.get(`user::${username}`);
    res.json(result.content);
  } catch (err) {
    res.status(500).send('Error fetching user');
  }
  };
  
export const updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;
  const collection = req.app.get('collection');
  
  try {
    await collection.upsert(`user::${username}`, updates);
    res.send('User updated');
  } catch (err) {
    res.status(500).send('Error updating user');
  }
  };
  
export const deleteUser = async (req, res) => {
  const { username } = req.params;
  const collection = req.app.get('collection');
  
  try {
    await collection.remove(`user::${username}`);
    res.send('User deleted');
  } catch (err) {
    res.status(500).send('Error deleting user');
  }
  };