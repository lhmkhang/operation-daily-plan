import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { visuallyHidden } from '@mui/utils';
import Collapse from '@mui/material/Collapse';
import ButtonComponent from './Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import style from '@/styles/Table.module.css';
import { useRouter } from 'next/navigation'
import { ReportDetailContext } from '@/components/helpers/ReportDetailContext';


// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)


const TableComponent = (props) => {
    //props = {tblType, tblTitle, tblHeader, tblData}
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('group_name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(-1);
    const router = useRouter();

    if (props.tblType === "ListReportv2") {
        let jsonKey = [...new Set(props.tblDataString.map(value => Object.keys(value)).flat())];
        jsonKey = jsonKey.filter(value => !props.listInvisible.includes(value));
        let listGroup = [...new Set(props.tblDataString.map(value => value.Group).flat())];

        function descendingComparator(a, b, orderBy) {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }

        function getComparator(order, orderBy) {
            return order === 'desc'
                ? (a, b) => descendingComparator(a, b, orderBy)
                : (a, b) => -descendingComparator(a, b, orderBy);
        }

        const visibleRows = React.useMemo(
            () =>
                stableSort(props.tblDataString, getComparator(order, orderBy)).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                ),
            [order, orderBy, page, rowsPerPage],
        );

        function stableSort(array, comparator) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            stabilizedThis.sort((a, b) => {
                const order = comparator(a[0], b[0]);
                if (order !== 0) {
                    return order;
                }
                return a[1] - b[1];
            });
            return stabilizedThis.map((el) => el[0]);
        }

        function EnhancedTableHead(props) {
            const { order, orderBy, onRequestSort } =
                props;
            const createSortHandler = (property) => (event) => {
                onRequestSort(event, property);
            };

            return (
                <TableHead>
                    <TableRow>
                        <TableCell
                            key='no'
                            align='center'
                            padding='normal'
                            className={style.tableHeaderNo}
                        >
                            No
                        </TableCell>
                        {props.headers.map((headCell) => (
                            <TableCell
                                key={headCell}
                                align='left'
                                padding='normal'
                                sortDirection={orderBy === headCell ? order : false}
                                className={style.tableHeader}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell}
                                    direction={orderBy === headCell ? order : 'asc'}
                                    onClick={createSortHandler(headCell)}
                                >
                                    {ConvertTitle(headCell)}
                                    {orderBy === headCell ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell
                            key='action'
                            align='center'
                            padding='normal'
                            className={style.tableHeaderAction}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
            );
        }

        EnhancedTableHead.propTypes = {
            onRequestSort: PropTypes.func.isRequired,
            order: PropTypes.oneOf(['asc', 'desc']).isRequired,
            orderBy: PropTypes.string.isRequired,
            rowCount: PropTypes.number.isRequired,
        };

        function EnhancedTableToolbar(props) {
            const { title } = props;
            return (
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...({
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }),
                    }}
                >
                    <Typography
                        className={style.tableTitle}
                        variant="h5"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <TextField id="outlined-basic" label="Search Report" variant="outlined" className={style.tableInputSearch} />
                </Toolbar>
            );
        }

        function ConvertTitle(dbString) {
            const formattedStrings = dbString.replace(/^_/, '').replace("_", " ");
            const resultString = formattedStrings.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return resultString;
        }

        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleEditReportOnclick = (props) => {
            router.push("/report-config/" + props);
        }

        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.tblDataString.length) : 0;

        return (
            <Box className={style.tableBox} >
                <Paper className={style.tablePaper}>
                    <EnhancedTableToolbar title="List Group Report" cbcData={listGroup} />
                    <TableContainer component={Paper}>
                        <Table
                            className={style.tableMain}
                            aria-labelledby="tableTitle"
                            size='medium'>
                            <EnhancedTableHead
                                headers={jsonKey}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={props.tblDataString.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <React.Fragment key={labelId}>
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    className={style.tableMainCell}
                                                >
                                                    {index + 1}
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        id={labelId}
                                                        onClick={() => setOpen(open == index ? -1 : index)}

                                                    >
                                                        {open == index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                {jsonKey.map(keys => {
                                                    return (
                                                        <TableCell
                                                            align="left"
                                                            className={style.tableMainCell}
                                                            key={keys + index}
                                                        >
                                                            {row[keys]}
                                                        </TableCell>
                                                    )
                                                }
                                                )}
                                                <TableCell align="center" >
                                                    <ButtonComponent btnType="ReportConfig" btnIcon="BorderColor" btnLabel="Edit" btnClass='btnEdit' />
                                                    <ButtonComponent btnType="ReportConfig" btnIcon="DeleteForever" btnLabel="Delete" btnClass='btnDelete' />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className={style.tableSubCell} colSpan={6}>
                                                    <Collapse in={open == index} timeout="auto" unmountOnExit>
                                                        <Box className={style.tableSubCallBox}>
                                                            <Typography variant="h6" gutterBottom component="div" className={style.tableSubTitle}>
                                                                Detail Group
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow className={style.tableSubTitleTable}>
                                                                        <TableCell className={style.tableSubHeaderNo}>No</TableCell>
                                                                        <TableCell>Report Name</TableCell>
                                                                        <TableCell>Create Date</TableCell>
                                                                        <TableCell>Description</TableCell>
                                                                        <TableCell className={style.tableSubHeaderAction}>Action</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {row.reports.map((reportRow) => (
                                                                        <TableRow className={style.tableSubRow} key={reportRow._id}>
                                                                            <TableCell component="th" scope="row">
                                                                                {reportRow._id}
                                                                            </TableCell>
                                                                            <TableCell>{reportRow.report_name}</TableCell>
                                                                            <TableCell>{reportRow.date_create}</TableCell>
                                                                            <TableCell>
                                                                                {reportRow.description}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <ButtonComponent btnType="ReportConfig" btnIcon="EditNote" btnLabel="Edit" btnClass='btnEdit' onClick={() => handleEditReportOnclick(reportRow._id)} />
                                                                                <ButtonComponent btnType="ReportConfig" btnIcon="DeleteSweep" btnLabel="Delete" btnClass='btnDelete' />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        component="div"
                        count={props.tblDataString.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        );
    } else if (props.tblType === "DemoConfig") {

        let { reportsInfo } = useContext(ReportDetailContext);

        const tblData = props.tblData;
        const tblStringData = reportsInfo.dataString_demo.find(item => item._id === tblData.data_source_id);
        const tblDatainfo = tblStringData ? JSON.parse(tblStringData.dataString) : [];

        return (
            <TableContainer component={Paper}>
                <Typography level="body-sm" textAlign="left" sx={{ ml: 2, fontSize: 13 }}>
                    {tblData.caption ? "Caption:" + tblData.caption : ""}
                </Typography>
                <Table size="small" sx={{ width: 470, fontSize: 5 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            {
                                Object.keys(tblDatainfo[0]).map(key => (
                                    <TableCell key={key} align='center' sx={{ fontSize: 12 }}>{key}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tblDatainfo.map((row) => (
                            <TableRow key={row.Quarter}>
                                <TableCell component="th" scope="row" align='left' sx={{ fontSize: 12 }}>
                                    {row.Quarter}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: 12 }}>{row.Actual}</TableCell>
                                <TableCell align="center" sx={{ fontSize: 12 }}>{row.Expect}</TableCell>
                                <TableCell align="center" sx={{ fontSize: 12 }}>{row["Expect%"]}</TableCell>
                                <TableCell align="center" sx={{ fontSize: 12 }}>{row["Actual%"]}</TableCell>
                                <TableCell align="center" sx={{ fontSize: 12 }}>{row["Archirved"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
};

export default TableComponent;