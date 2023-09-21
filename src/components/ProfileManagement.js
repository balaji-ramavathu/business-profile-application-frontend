import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddressField from './AddressField';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import profileSrc from './profile.png';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import USER_APIS from '../API.js'



function ProfileManagement() {
    const [profile, setProfile] = useState({
        legalName: '',
        companyName: '',
        businessAddress: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
        legalAddress: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
        taxId: '',
        email: '',
        website: ''
    })
    
    const [sameAddress, setSameAddress] = useState(false)

    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isError, setIsError] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Validation functions
    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email);
    const isZipValid = (zip) => /^\d{6}$/.test(zip); 
    const userId = sessionStorage.getItem("userId") ?? ""


    const fetchUserProfileData = async () => {
        try {
          const response = await fetch('http://localhost:8080/user/get/'.concat(userId));
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
          } else {
            console.error('Failed to fetch profile data');
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
    };
    
    useEffect(() => {
        fetchUserProfileData();
    }, []);

    const handleSubmit = () => {

        if (profile.taxId.length === 0 || profile.legalName.length === 0 || profile.companyName.length === 0) {
            alert('Please fill all required fields')
            return;
        }
        
        if (!isEmailValid()) {
            alert('Invalid email address');
            return;
        }
        if (!isZipValid(profile.businessAddress.zip) || !isZipValid(profile.legalAddress.zip)) {
            alert('Invalid ZIP code');
            return;
        }

        setIsSaving(true);

        fetch('http://localhost:8080/user/add-or-update', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((res) => {
            if (res.ok) {
                setIsSaved(true);
                setIsError(false);
                setSnackbarOpen(true);
            } else {
                setIsSaved(false); 
                setIsError(true);
                setSnackbarOpen(true);
            }
            setIsSaving(false);
        })
        .catch((e) => {
            setIsError(true);
            setIsSaved(false);
            setIsSaving(false);
            setSnackbarOpen(true);
            console.error(e)
        })

        console.log("AFter try")
    };

    

    return (
        <Box display='flex' flexDirection='row'>
            <Box width={'250px'} height={'100%'} style={{paddingTop: '80px'}} alignItems={'center'}>
                <img src={profileSrc} style={{width: '100%'}} alt='Profile icon'/>
                <Box style={{padding: '10px'}}>
                    <Typography variant='subtitle1' fontWeight='bold' style={{float: 'center'}}>{profile.legalName}</Typography>
                    <Typography variant='subtitle2' fontWeight='bold' 
                        overflow='hidden' textOverflow={'ellipsis'}>
                            {profile.email}
                    </Typography>
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
                <Typography variant='h5' style={{paddingLeft: '40px', paddingTop: '40px', fontWeight: 'bold'}}>
                    Your Profile
                </Typography>
                <form className='Profile-Form'>
                    <Box display={'flex'} flexDirection='row' padding={'4px'}>
                        <Box>
                            <Typography variant='subtitle1'>Legal Name</Typography>
                            <TextField
                                label="Legal Name"
                                size='small'
                                value={profile.legalName}
                                onChange={(e) => {
                                    setProfile({...profile, legalName: e.target.value})
                                }}
                                margin="normal"
                                style={{marginRight: '10px'}}
                            />
                        </Box>
                        <Box>
                            <Typography variant='subtitle1'>Company Name</Typography>
                            <TextField
                                label="Company Name"
                                size='small'
                                value={profile.companyName}
                                onChange={(e) => {
                                    setProfile({...profile, companyName: e.target.value})
                                }}
                                margin="normal"
                            />
                        </Box>
                    </Box>

                    <Box display={'flex'} flexDirection='row' padding={'4px'}>
                        <Box>
                            <Typography variant='subtitle1'>Email</Typography>
                            <TextField
                                label="Enter email address"
                                size='small'
                                value={profile.email}
                                onChange={(e) => {
                                    setProfile({...profile, email: e.target.value})
                                }}
                                margin="normal"
                                error={!isEmailValid()}
                                helperText={!isEmailValid() ? 'Invalid email address' : ''}
                                style={{marginRight: '10px'}}
                            />
                        </Box>
                        <Box>
                            <Typography variant='subtitle1'>Website</Typography>
                            <TextField
                                label="Enter company website"
                                size='small'
                                value={profile.website}
                                onChange={(e) => {
                                    setProfile({...profile, website: e.target.value})
                                }}
                                margin="normal"
                            />
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant='subtitle1'>Tax ID</Typography> 
                        <TextField
                            label="Enter your Tax ID (PAN / EIN)"
                            size='small'
                            value={profile.taxId}
                            onChange={(e) => {
                                setProfile({...profile, taxId: e.target.value})
                            }}
                            margin="normal"
                        />
                    </Box>

                    <Box display={'flex'} flexDirection='row'>
                        <Box style={{marginRight: '10px', marginTop: '15px'}}>
                            <Typography variant='subtitle1'>Business Address</Typography>
                            <AddressField label="Business" address={profile.businessAddress} setAddress={(e) => {
                                setProfile({...profile, businessAddress: e})
                            }} />
                        </Box>
                        <Box style={{marginLeft: '10px'}}>
                            <Box display='flex' flexDirection='row' alignItems='center'>
                                <Typography variant='subtitle1' style={{marginRight: '150px'}}>Legal Address</Typography>
                                <FormControlLabel 
                                    control={
                                        <Checkbox checked={sameAddress} onChange={() => {
                                            setSameAddress(!sameAddress)
                                            if (!sameAddress) {
                                                setProfile({...profile, legalAddress: profile.businessAddress})
                                            } else {
                                                setProfile({...profile, legalAddress: {
                                                    line1: '',
                                                    line2: '',
                                                    city: '',
                                                    state: '',
                                                    zip: '',
                                                    country: ''
                                                }})
                                            }}}
                                        />
                                    }
                                    label='Same as Business Address'
                                    labelPlacement='end'
                                />
                            </Box>
                            
                            <AddressField label="Legal" address={profile.legalAddress} setAddress={(e) => {
                                setProfile({...profile, legalAddress: e})
                            }} />
                        </Box>
                    </Box>

                    <Button 
                        type="button" variant="contained" color="primary"
                        style={{marginLeft: '450px', marginTop: '30px'}}
                        onClick={handleSubmit}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Profile'}
                    </Button>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={6000}
                        className='custom-snackbar'
                        onClose={() => setSnackbarOpen(false)}
                    >
                        <MuiAlert
                            elevation={6}
                            variant="filled"
                            severity={isError ? 'error' : 'success'}
                            onClose={() => setSnackbarOpen(false)}
                        >
                        {isError ? 'Error saving profile.' : 'Profile saved successfully.'}
                        </MuiAlert>
                    </Snackbar>
                </form>
            </Box>
        </Box>
        
    );
}


export default ProfileManagement;
