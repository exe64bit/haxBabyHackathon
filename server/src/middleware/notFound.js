export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Observatory telescope cannot find ${req.method} ${req.originalUrl}`,
    errors: ['ROUTE_NOT_FOUND']
  });
};

