import React, { useState } from 'react';

const ProductSearch = ({ onProductSearch }) => {
  const [valueSearch, setValueSearch] = useState('')

  const handleInputSearch = (e) => {
    setValueSearch(e.target.value)
    onProductSearch(e.target.value)
  };

  return (
    <div className="col-sm-4">
      <div className="form-group">
        <input
          type="text"
          placeholder="Search product..."
          className="form-control"
          value={valueSearch}
          onChange={handleInputSearch}
        />
      </div>
    </div>
  );
}

export default ProductSearch;