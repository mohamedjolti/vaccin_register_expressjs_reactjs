import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { VaccinContext } from '../context/vaccinContext';
import AddVaccin from './AddVaccin';
import { UPDATE_VACCIN } from '../context/actionTypes';
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'hospital',
        headerName: 'Hosptial',
        width: 500,
        editable: true,
    },
    {
        field: 'date',
        headerName: 'date',
        width: 500,
        editable: true,
    },

];




export function Home() {
    const [rows, setRows] = useState([]);
    const { fetchVaccins, vaccins, updateVaccin } = useContext(VaccinContext);
    useEffect(() => {
        fetchVaccins();
        console.log("emit effect", rows);
    }, []);
    const handleEdit = (editedRow) => {
        const {field,value}=editedRow;
        editedRow.row[field]=value;
        updateVaccin(editedRow.row);
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <AddVaccin />
            <DataGrid
                rows={vaccins}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onCellEditCommit={handleEdit}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}