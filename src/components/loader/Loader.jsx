import React from 'react';

const Loader = () => {
   return (
      <div className='container' >
         <div className='loader flex justify-center align-center'>
            <img style={{width: '100px', height: '60vh'}} src='DualRing.svg' alt='' />
         </div>
      </div>
   );
};

export default Loader;
