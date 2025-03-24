# logistic-sheet
# Logistic Sheet Generator (CSV Import + Export)

A lightweight web application for completing logistic sheets based on a list of products imported from a CSV file.

## 🚀 Features

- Import `.csv` product list (Product Code + Product Name)
- Select a product from dropdown
- Fill out a logistic sheet with packaging and pallet details
- Display all completed sheets in a table
- Export completed data to a `.csv` file
- Warns user before leaving page if sheets are not exported
- No data saved locally (session is cleared on close)

## 📦 Technologies Used

- HTML / CSS / JavaScript
- [PapaParse](https://www.papaparse.com/) for CSV parsing
- Blob + `download` for CSV export

## 📁 File Structure

## 📋 Logistic Sheet Fields

| Field                        | Unit (SI)    |
|-----------------------------|--------------|
| Units per box               | pieces       |
| Units per pallet            | pieces       |
| Box dimensions (L x W x H)  | cm           |
| Gross weight per box        | kg           |
| Net weight per box          | kg           |
| Pallet layers               | layers       |
| Total pallet height         | cm           |

## 📄 License

This project is licensed under the [MIT License](LICENSE).
You are free to use, modify, and distribute it.

---

Made for operational logistics and workflow optimization.


