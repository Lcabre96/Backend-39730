class ProductManager {
    constructor() {
        this.products = [];
    }

    async getProducts() {
        return this.products
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {
            const productFoundByCode = this.products.find(product => product.code === code);
            if (productFoundByCode) {
                throw new Error(`Code ${code} already exists!`);
            }
            const newProduct = {
                id: this.products.length + 1,
                title, description, price, thumbnail, code, stock,
            }
            this.products.push(newProduct);

            return newProduct
        } catch (error) {
            console.error(error.message);
        }
    }

    async getProductById() {
        const productFound = this.products.find(product => product.id === id);
        if (productFound) {
            return productFound
        }
        console.error('Not found');
    }
}

const init = async () => {

    const productManager = new ProductManager();
    
    
    await productManager.addProduct({
        title: 'Mouse',
        description: 'Descripción',
        price: 5000,
        code: 'CL250',
        thumbnail: 'image.png',
        stock: 20
    })
   
    await productManager.addProduct({
        title: 'Teclado',
        description: 'Descripción',
        price: 10000,
        code: 'CL920',
        thumbnail: 'image.png',
        stock: 50
    })
    
    console.log( await productManager.getProducts())
        
    const foundProduct = await productManager.getProductById(1);
    console.log({ foundProduct });
    const foundProductError = await productManager.getProductById(2);
    console.log({ foundProductError });
}

init();












































































