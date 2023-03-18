class ProductManager {
    constructor() {
        this.products = [];
        this.idCounter = 0;
    }

    getProducts() {
        return this.products;
    }
    

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const productExist = this.products.find(prod => prod.code === code)
        if (productExist) {
            console.error(`This code ${code} existing`)
            return
        }
        const newProduct = {
        id: this.idCounter += 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        };
        this.products.push(newProduct);
        return newProduct.id;
    }

    getProductById(id) {
        const idExist = this.products.find((prod) => prod.id === id);
        if (!idExist) {
            return console.error(`The product whit id ${id}, does not exist`)
        }
        return idExist
    }
}

const productManager = new ProductManager()

console.log(productManager.getProducts())

productManager.addProduct({
    title: 'Producto Prueba 1',
    description: 'producto 1',
    price: 200,
    thumbnail: 'imagen1.jpg',
    code: 'ABC123',
    stock: 20
})
console.log(productManager.getProducts())

productManager.addProduct({
    title: 'Producto Prueba 2',
    description: 'producto 2',
    price: 200,
    thumbnail: 'imagen2.jpg',
    code: 'ABC123',
    stock: 15
})


console.log(productManager.getProductById(1))










































































