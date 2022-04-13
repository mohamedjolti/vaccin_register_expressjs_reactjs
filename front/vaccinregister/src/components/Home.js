import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect ,useContext } from 'react';
import { VaccinContext } from '../context/vaccinContext';
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'hospital',
        headerName: 'Hosptial',
        width: 150,
        editable: true,
    },
    {
        field: 'date',
        headerName: 'date',
        width: 150,
        editable: true,
    }
];




export function Home() {
    const [rows, setRows] = useState([]);
    const {fetchVaccins,vaccins}=useContext(VaccinContext);
    useEffect( () => {
     fetchVaccins(); 
     console.log("emit effect",rows);
    }, []);
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={vaccins}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}