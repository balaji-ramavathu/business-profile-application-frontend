import React from 'react';
import TextField from '@mui/material/TextField';

function AddressField({ label, address, setAddress }) {

    const isZipValid = (zip) => /^\d{6}$/.test(zip); 
    return (
        <div className='Address-Form'>
            <TextField
                label={`${label} Line 1`}
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                size='small'
                margin="normal"
            />
            <TextField
                
                label={`${label} Line 2`}
                value={address.line2}
                onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                size='small'
                margin="normal"
            />
            <TextField
                label={`${label} City`}
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                size='small'
                margin="normal"
            />
            <TextField
                label={`${label} State`}
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                size='small'
                margin="normal"
            />
            <TextField
                label={`${label} Zip`}
                value={address.zip}
                type='number'
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                error={!isZipValid(address.zip)}
                helperText={!isZipValid(address.zip) ? 'Invalid Zip' : ''}
                size='small'
                margin="normal"
            />
            <TextField
                label={`${label} Country`}
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                size='small'
                margin="normal"
            />
        </div>
  );
}

export default AddressField;
