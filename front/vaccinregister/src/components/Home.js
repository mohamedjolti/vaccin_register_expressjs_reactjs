import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { VaccinContext } from '../context/vaccinContext';
import AddVaccin from './AddVaccin';
import { UPDATE_VACCIN } from '../context/actionTypes';
import { Button } from '@mui/material';




export function Home() {
    const [rows, setRows] = useState([]);
    const { fetchVaccins, vaccins, updateVaccin , deleteVaccin} = useContext(VaccinContext);
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
        {
            field: 'delete',
            headerName: 'delete',
            width: 500,
            editable: false,
            renderCell:(params)=>{
                return  (  <Button onClick={()=>deleteVaccin(params.row._id)}>remove</Button> )
            }
        },
    ];
    

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