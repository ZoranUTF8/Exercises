import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientsService from "../../services/patients"
import { Patient } from "../../types"
import { Typography, CircularProgress, Grid } from '@mui/material';




interface RouteParams extends Record<string, string | undefined> {
    id: string;
}



const SinglePatientDetailsPage = () => {
    const [patientData, setPatientData] = useState<Patient>()
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = useParams<RouteParams>() as RouteParams;




    useEffect(() => {
        const fetchData = async () => {
            try {
                // Set loading to true before fetching data
                setLoading(true);

                // Fetch patient data
                const data = await patientsService.getSinglePatientDetails(id)

                // Set patient data and loading to false when data is fetched
                setPatientData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [])


    // Render loading state or patient data based on the loading value

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Patient Details</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Patient id: {patientData?.id}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Name: {patientData?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Gender: {patientData?.gender}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Occupation: {patientData?.occupation}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    DOB: {patientData?.dateOfBirth}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    SSN: {patientData?.ssn}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SinglePatientDetailsPage;

