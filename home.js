document.addEventListener('DOMContentLoaded', () => {
    const Product_Table = document.getElementById('Product_Table');
    const message = document.getElementById('message');
    const warningMessage = document.getElementById('warningMessage');
    const Product_form = document.getElementById('Product_form');
     
     
     let editIndex = -1;
     let filtered = false;
  
     let products = [
       { id: 1, name: 'Milk', quantity: 30, expiryDate: '2024-07-25' },
       { id: 2, name: 'Bread', quantity: 5, expiryDate: '2024-07-23' },
       { id: 3, name: 'Eggs', quantity: 30, expiryDate: '2024-08-01' }
     ];
     
     
         const loadProducts = () => {
           Product_Table.innerHTML = '';
           let warnings = [];
           products.forEach((product, index) => {
             const row = document.createElement('tr');
             const isExpiringSoon = new Date(product.expiryDate) < new Date(Date.now() + 7*24*60*60*1000);
             if (isExpiringSoon) {
               row.className = 'bg-red-200';
               warnings.push(product.name);
             }
     
             
                     row.innerHTML = `
                       <td class="py-2 px-4">${product.name}</td>
                       <td class="py-2 px-4">${product.quantity}</td>
                       <td class="py-2 px-4">${new Date(product.expiryDate).toLocaleDateString()}</td>
                       <td class="py-2 px-4">
                         <button onclick="editProduct(${index})" class="editButton"  >Edit</button>
                         <button onclick="deleteProduct(${index})" class="delButton">Delete</button>
                       </td>
                     `;
                     Product_Table.appendChild(row);
                   });
             
                   if (warnings.length > 0) {
                     warningMessage.textContent = `Warning: The following products are expiring soon: ${warnings.join(', ')}`;
                   } else {
                     warningMessage.textContent = '';
                   }
                 };  
                     window.editProduct = (index) => {
                       const product = products[index];
                       document.getElementById('Product_id').value = product.id;
                       document.getElementById('Product_name').value = product.name;
                       document.getElementById('Product_quantity').value = product.quantity;
                       document.getElementById('Expiry_Date').value = product.expiryDate;
                       editIndex = index;
                     };
                 
                     window.deleteProduct = (index) => {
                       products.splice(index, 1);
                       loadProducts();
                       showMessage('Product deleted successfully!', 'green');
                     };
                 
                     window.sortProducts = (key) => {
                       products.sort((a, b) => {
                         if (a[key] < b[key]) return -1;
                         if (a[key] > b[key]) return 1;
                         return 0;
                       });
                       loadProducts();
                     };
                     window.filterExpiringProducts = () => {
                       filtered = true;
                       products = products.filter(product => new Date(product.expiryDate) < new Date(Date.now() + 7*24*60*60*1000));
                       loadProducts();
                     };
                 
                     window.resetFilter = () => {
                       filtered = false;
                       products = [
                         { id: 1, name: 'Milk', quantity: 10, expiryDate: '2024-07-25' },
                         { id: 2, name: 'Bread', quantity: 5, expiryDate: '2024-07-23' },
                         { id: 3, name: 'Eggs', quantity: 30, expiryDate: '2024-08-01' }
                       ];
                       loadProducts();
                     };
                 
                     Product_form.addEventListener('submit', (e) => {
                       e.preventDefault();
                       const id = document.getElementById('Product_id').value;
                       const name = document.getElementById('Product_name').value;
                       const quantity = document.getElementById('Product_quantity').value;
                       const expiryDate = document.getElementById('Expiry_Date').value;
                 
                       const newProduct = { id, name, quantity, expiryDate };
                       if (editIndex >= 0) {
                         products[editIndex] = newProduct;
                         editIndex = -1;
                         showMessage('Product updated successfully!', 'green');
                       } else {
                         newProduct.id = products.length + 1;
                         products.push(newProduct);
                         showMessage('Product added successfully!', 'green');
                       }
                 
                       loadProducts();
                       Product_form.reset();
                     });
                 
                     const showMessage = (text, color) => {
                       message.textContent = text;
                       message.style.color = color;
                       setTimeout(() => {
                         message.textContent = '';
                       }, 3000);
                     };
                 
                     loadProducts();
                   });
  
  
     
  
  
  