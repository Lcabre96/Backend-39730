const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.format = 'utf-8';
    }

    getNewID = list =>{
        const count = list.length;
        return (count > 0) ? list[count - 1].id + 1 : 1;
    } 
    existProduct = (code, list) => {
        return ;
    }

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
        const list = await this.getProducts();
        const newID = this.getNewID(list);
        const exis = list.some(el => el.code == code);
        if (!exis) {
            const newProduct = {
                id: newID,
                title: title ?? "",
                description: description ?? "",
                price: price ?? 0.0,
                thumbnail: thumbnail ?? "",
                code: code ?? '',
                stock: stock ?? 0
            };
            list.push(newProduct);
            await this.write(list);
            return newProduct;
        }
        return {error: `code: ${code} already exists`};
    }

    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r));
        }
        return [];
    }

    getProducts = async () => {
        const list = await this.read();
        return list;
    }

    write = async list => {
        fs.promises.writeFile(this.path, JSON.stringify(list));
    }

    

    getProductbyId = async (id) => {
        const list = await this.getProducts();
        return list.find((prod) => prod.id == id) ?? {error: `product not found`};;
    }

    updateProduct = async (id, campo, update) => {
        const list = await this.getProducts();
        const idx = list.indexOf(e => e.id == id);
        
        if(idx < 0) return "product not found";
        list[idx][campo] = update;
        await this.write(list);
        return list[idx][campo];
    }

    updateProductObj = async (id, obj) => {
        obj.id = id;
        const list = await this.read();

        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list[idx] = obj;
        await this.write(list);
    }

    deleteProduct = async (id) => {
        const list = await this.getProducts();
        const idx = list.findIndex((e) => e.id == id);
        if (idx < 0) return;
        list.splice(idx, 1);
        await this.write(list);
        return list;
    }

}

module.exports = ProductManager;