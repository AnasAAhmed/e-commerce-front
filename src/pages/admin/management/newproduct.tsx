import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { FaArrowLeft } from "react-icons/fa";




const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [collections, Setcollections] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [cutPrice, setCutPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [size, setSize] = useState<string[]>(["s","m","l","xl","xxl"]);
  const [color, setColor] = useState<string[]>([]);
  const [style, setStyle] = useState<string[]>([]);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();
  const [load, setLoad] = useState<boolean>(false);

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    if (!name || !price || stock < 0 || !category || !photo || !description ||!collections) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("cutPrice", cutPrice.toString());
    formData.set("description", description);
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);
    formData.set("collections", collections);
    size.forEach((s, index) => {
      formData.append(`size[${index}]`, s);
    });
    color.forEach((c, index) => {
      formData.append(`color[${index}]`, c);
    });
    style.forEach((st, index) => {
      formData.append(`style[${index}]`, st);
    });

    const res = await newProduct({ id: user?._id!, formData });
    setLoad(false);

    responseToast(res, navigate, "/admin/product");
  };
 
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <Link to={"/admin/transaction"}>
          <FaArrowLeft />
        </Link>
        <article>
          <form onSubmit={submitHandler} >
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                required
                rows={2}
                className="w-full border-2 p-2 border-gray-300"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>cutPrice</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={cutPrice}
                onChange={(e) => setCutPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label>collections</label>
              <input
                required
                type="text"
                placeholder="eg. electronic, crocrey, wearables etc"
                value={collections}
                onChange={(e) => Setcollections(e.target.value)}
              />
            </div>
            <div>
              <label>Size (comma-separated)</label>
              <input
                type="text"
                placeholder="eg. S, M, L"
                value={size.join(",")} // Join array elements with commas
                onChange={(e) => setSize(e.target.value.split(",").map(item => item.trim()))} // Split input string by comma
              />
            </div>
            <div>
              <label>Color (comma-separated)</label>
              <input
                type="text"
                placeholder="eg. Red, Blue, Green or hex: #000000"
                value={color.join(",")}
                onChange={(e) => setColor(e.target.value.split(",").map(item => item.trim()))}
                
              />
            </div>
            <div>
              <label>Style (comma-separated)</label>
              <input
                type="text"
                placeholder="eg. Casual, Formal, Sporty"
                value={style.join(",")}
                onChange={(e) => setStyle(e.target.value.split(",").map(item => item.trim()))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">{load ? "Creating..." : "Create"}</button>

          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
