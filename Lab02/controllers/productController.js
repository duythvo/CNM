import docClient from "../config/dynamodb.js";
import Product from "../models/Product.js";
import s3 from "../config/s3.js";
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const TABLE_NAME = "Products";
const BUCKET_NAME = "duythvo-cnm-products";


export const getAllProducts = async (req, res) => {
  const data = await docClient.send(
    new ScanCommand({ TableName: TABLE_NAME })
  );
  res.render("products", { products: data.Items });
};


export const createProduct = async (req, res) => {
  let imageUrl = "";

  if (req.file) {
    const fileName = `products/${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    imageUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileName}`;
  }

  const product = new Product({
    ...req.body,
    url_image: imageUrl,
  });

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: product,
    })
  );

  res.redirect("/products");
};


export const getProductById = async (req, res) => {
  const data = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id },
    })
  );

  res.render("editProduct", { product: data.Item });
};


export const updateProduct = async (req, res) => {
  let imageUrl = req.body.old_image;

  if (req.file) {
    const fileName = `products/${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    imageUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileName}`;
  }

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id },
      UpdateExpression:
        "set #name=:name, price=:price, quantity=:quantity, url_image=:url_image",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": req.body.name,
        ":price": Number(req.body.price),
        ":quantity": Number(req.body.quantity),
        ":url_image": imageUrl,
      },
    })
  );

  res.redirect("/products");
};

export const deleteProduct = async (req, res) => {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id },
    })
  );

  res.redirect("/products");
};
