import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import patientsService from "../../services/patientsService"
import { Patient, Entry, HealthCheckEntry, StayType, OccupationalHealthcareEntry, HospitalEntry, Diagnoses } from "../../types"
import { Typography, CircularProgress, Grid } from '@mui/material';




interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

interface Props {
    diagnosesData: Diagnoses[]
}



const SinglePatientDetailsPage = ({ diagnosesData }: Props) => {
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
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching patient data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const getDiagnosisExplanation = (code: string) => {
        const diagnosis = diagnosesData.find((diagnosis) => diagnosis.code === code);
        return diagnosis ? diagnosis.name : "Unknown Diagnosis";
    };


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

            <Grid item xs={12}>
                <Typography variant="h6">Entries:</Typography>
                {patientData?.entries && patientData.entries.length > 0 ? (
                    patientData.entries.map((entry: Entry) => {
                        if (entry.type === StayType.Hospital) {
                            const hospitalEntry = entry as HospitalEntry;
                            return (
                                <div key={hospitalEntry.id}>
                                    <strong>Date:</strong>{" "}
                                    <Typography variant="body1" component="span" sx={{ fontWeight: "bold" }}>
                                        <strong>{hospitalEntry.date}</strong>
                                    </Typography>
                                    <Typography variant="body1">Description: {hospitalEntry.description}</Typography>

                                    <div>
                                        <Typography variant="body1">
                                            Diagnose Codes:
                                        </Typography>
                                        <ul>
                                            {hospitalEntry.diagnosisCodes?.map((code: Diagnoses["code"]) => (
                                                <li key={code}>{code} - {getDiagnosisExplanation(code)}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Typography variant="body1">Discharge Date: {hospitalEntry.discharge.date}</Typography>
                                    <Typography variant="body1">Discharge Criteria: {hospitalEntry.discharge.criteria}</Typography>
                                </div>
                            );
                        } else if (entry.type === StayType.OccupationalHealthcare) {
                            const occupationalHealthcareEntry = entry as OccupationalHealthcareEntry;
                            return (
                                <div key={occupationalHealthcareEntry.id}>
                                    <Typography variant="body1">Date: {occupationalHealthcareEntry.date}</Typography>
                                    <Typography variant="body1">Description: {occupationalHealthcareEntry.description}</Typography>
                                    {occupationalHealthcareEntry.diagnosisCodes && occupationalHealthcareEntry.diagnosisCodes.length > 0 && (
                                        <div>
                                            <Typography variant="body1">
                                                Diagnose Codes:
                                            </Typography>
                                            <ul>
                                                {occupationalHealthcareEntry.diagnosisCodes.map((code: Diagnoses["code"]) => (
                                                    <li key={code}>{code} - {getDiagnosisExplanation(code)}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <Typography variant="body1">Employer Name: {occupationalHealthcareEntry.employerName}</Typography>
                                    {occupationalHealthcareEntry.sickLeave && (
                                        <>
                                            <Typography variant="body1">Sick Leave Start Date: {occupationalHealthcareEntry.sickLeave.startDate}</Typography>
                                            <Typography variant="body1">Sick Leave End Date: {occupationalHealthcareEntry.sickLeave.endDate}</Typography>
                                        </>
                                    )}
                                </div>
                            );
                        } else {
                            const healthCheckEntry = entry as HealthCheckEntry;
                            return (
                                <div key={healthCheckEntry.id}>
                                    <Typography variant="body1">Date: {healthCheckEntry.date}</Typography>
                                    <Typography variant="body1">Description: {healthCheckEntry.description}</Typography>
                                    <Typography variant="body1">Health Check Rating: {healthCheckEntry.healthCheckRating}</Typography>
                                </div>
                            );
                        }
                    })
                ) : (
                    <Typography variant="body1">No entries available.</Typography>
                )}
            </Grid>


        </Grid>
    );
};

export default SinglePatientDetailsPage;

