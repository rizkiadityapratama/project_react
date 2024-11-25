import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Tooltip, TextField } from '@mui/material'; // Import TextField untuk input pencarian

// Komponen yang disesuaikan
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FF7043',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#FF5722',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
    padding: '12px 16px',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '8px 16px',
  boxShadow: theme.shadows[2],
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  margin: '5px',
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  color: '#FF5722',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: theme.spacing(4, 0),
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
}));

// Komponen Dashboard
export default function Dashboard() {
  const [siswa, setSiswa] = useState([]);
  const [filteredSiswa, setFilteredSiswa] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'no',
    direction: 'asc',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3030/siswa')
      .then(response => {
        setSiswa(response.data);
        setFilteredSiswa(response.data);
      })
      .catch(error => {
        console.error("Error saat mengambil data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);

    const filtered = siswa.filter(student =>
      student.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      student.nik.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSiswa(filtered);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const student = [...filteredSiswa].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3030/siswa/${id}`)
          .then(() => {
            setSiswa(prevSiswa => prevSiswa.filter(student => student.id !== id));
            setFilteredSiswa(prevSiswa => prevSiswa.filter(student => student.id !== id));
            Swal.fire('Dihapus!', 'Data siswa telah dihapus.', 'success');
          })
          .catch((error) => {
            console.error("Error saat menghapus siswa:", error);
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
          });
      }
    });
  };

  const handleAdd = () => {
    navigate('/tambahdatasiswa');
  };

  return (
    <>
      <Navbar />
      <StyledHeader variant="h4" gutterBottom>
        Daftar Siswa
      </StyledHeader>

      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleAdd}
        style={{ marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Tambah Siswa
      </StyledButton>

      <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
        <TextField
          label="Cari Siswa"
          variant="outlined"
          value={searchKeyword}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
      </Box>

      <Box
        component="main"
        sx={{
          p: 3,
          marginLeft: '240px',
          width: 'calc(100% - 240px)',
          backgroundColor: '#FF7043', // Add this line to set the background color to orange
          borderRadius: '8px', // Optional: adds rounded corners to the box
        }}
      >
        <TableContainer component={Paper} elevation={3} style={{ marginTop: '0px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell onClick={() => requestSort('no')}>No</StyledTableCell>
                <StyledTableCell onClick={() => requestSort('nik')}>NIK</StyledTableCell>
                <StyledTableCell onClick={() => requestSort('nama')}>Nama</StyledTableCell>
                <StyledTableCell align="right" onClick={() => requestSort('jurusan')}>Jurusan</StyledTableCell>
                <StyledTableCell align="right" onClick={() => requestSort('gender')}>Gender</StyledTableCell>
                <StyledTableCell align="right">Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ padding: '20px' }}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                student.map((siswa, index) => (
                  <StyledTableRow key={siswa.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{siswa.nik}</StyledTableCell>
                    <StyledTableCell>{siswa.nama}</StyledTableCell>
                    <StyledTableCell align="right">{siswa.jurusan}</StyledTableCell>
                    <StyledTableCell align="right">{siswa.gender}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Edit" arrow>
                        <Link to={`/EditDatasiswa/${siswa.id}`}>
                          <StyledButton variant="contained" color="primary" style={{ marginRight: '10px' }}>
                            🖊
                          </StyledButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <StyledButton variant="contained" color="error" onClick={() => handleDelete(siswa.id)}>
                          🗑️
                        </StyledButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
