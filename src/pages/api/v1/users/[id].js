export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  res.status(200).json({ name: id });
}
