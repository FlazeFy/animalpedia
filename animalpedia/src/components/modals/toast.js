// components/CustomToast.js
import React from 'react';
import { toast } from 'react-toastify';

const CustomToast = ({ msg }) => {
  return (
    <div>
      <p className='text-success'>{msg.toString()}</p>
    </div>
  );
};

export default CustomToast;
