export const isAdmin = async (req, res, next) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admin rights required.' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized as admin' });
    }
  };