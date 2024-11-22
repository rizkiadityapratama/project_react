import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material"; // Tooltip untuk pengalaman pengguna yang lebih baik

// Komponen Styled
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FF7043", // Header berwarna orange
    color: theme.palette.common.white,
    fontWeight: "bold",
    textAlign: "center",
    padding: "12px 16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out", // Efek hover halus
    "&:hover": {
      backgroundColor: "#FF5722",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    padding: "12px 16px",
    transition: "background-color 0.3s ease-in-out", // Efek hover halus
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: "8px 16px",
  boxShadow: theme.shadows[2],
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
  margin: "5px",
}));

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  color: "#FF5722",
  fontWeight: "bold",
  textAlign: "center",
  margin: theme.spacing(4, 0),
  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Menambahkan efek bayangan pada teks
}));

// Komponen Dashboard
export default function Dashboard() {
  const [siswa, setSiswa] = useState([]); // Mengganti teachers menjadi siswa sesuai permintaan Anda]
  const [sortConfig, setSortConfig] = useState({
    key: "no",
    direction: "asc",
  });
  const navigate = useNavigate();

  // Mengambil data siswa dari API
  useEffect(() => {
    axios
      .get("http://localhost:3030/siswa") // Pastikan endpoint Anda benar
      .then((response) => {
        setSiswa(response.data);
      })
      .catch((error) => {
        console.error("Kesalahan saat mengambil data:", error);
      });
  }, []);

  // Fungsi Sorting
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedSiswa = [...siswa].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  // Fungsi Hapus Data Siswa
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3030/siswa/${id}`)
          .then(() => {
            setSiswa((prevSiswa) =>
              prevSiswa.filter((student) => student.id !== id)
            );
            Swal.fire("Dihapus!", "Data siswa telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Kesalahan saat menghapus siswa:", error);
            Swal.fire(
              "Gagal!",
              "Terjadi kesalahan saat menghapus data.",
              "error"
            );
          });
      }
    });
  };

  // Fungsi Tambah Siswa
  const handleAdd = () => {
    navigate("/TambahDatasiswa"); // Arahkan ke halaman tambah siswa
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
        style={{
          marginBottom: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Tambah Siswa
      </StyledButton>

      <Box
        component="main"
        sx={{
          p: 3,
          marginLeft: "240px",
          width: "calc(100% - 240px)",
        }}
      >
        <TableContainer
          component={Paper}
          elevation={3}
          style={{ marginTop: "20px" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="tabel yang disesuaikan">
            <TableHead>
              <TableRow>
                <StyledTableCell onClick={() => requestSort("no")}>
                  No
                </StyledTableCell>
                <StyledTableCell onClick={() => requestSort("nik")}>
                  NIK
                </StyledTableCell>
                <StyledTableCell onClick={() => requestSort("nama")}>
                  Nama
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  onClick={() => requestSort("jurusan")}
                >
                  Jurusan
                </StyledTableCell>
                <StyledTableCell
                  align="right"
                  onClick={() => requestSort("gender")}
                >
                  Gender
                </StyledTableCell>
                <StyledTableCell align="center">Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedSiswa.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    style={{ padding: "20px" }}
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              ) : (
                sortedSiswa.map((student, index) => (
                  <StyledTableRow key={student.id}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>{student.nik}</StyledTableCell>
                    <StyledTableCell>{student.nama}</StyledTableCell>
                    <StyledTableCell align="right">
                      {student.jurusan}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {student.gender}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box display="flex" justifyContent="space-around">
                        <Tooltip title="Edit" arrow>
                            <StyledButton
                              variant="contained"
                              color="primary"
                              style={{ marginRight: "10px" }}
                              onClick={() => navigate(`/EditDatasiswa/${student.id}`)}
                            >
                              🖊
                            </StyledButton>
                        </Tooltip>
                        <Tooltip title="Hapus" arrow>
                          <StyledButton
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(student.id)}
                          >
                            🗑️
                          </StyledButton>
                        </Tooltip>
                      </Box>
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
