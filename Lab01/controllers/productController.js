import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.render("product", { products, editProduct: null });
};

export const getProductById = async (req, res) => {
  const products = await Product.findAll();
  const editProduct = await Product.findByPk(req.params.id);
  res.render("product", { products, editProduct });
};

export const saveProduct = async (req, res) => {
  const { id, name, price, quantity } = req.body;

  if (id) {
    await Product.update({ name, price, quantity }, { where: { id } });
  } else {
    await Product.create({ name, price, quantity });
  }

  res.redirect("/products");
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.redirect("/products");
};
