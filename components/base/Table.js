import React, { useEffect } from 'react';
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
import ComboboxComponent from '@/components/base/Combobox';
import Collapse from '@mui/material/Collapse';
import ButtonComponent from './Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import style from '@/styles/Table.module.css';

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
                    key='action'
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
                            {headCell}
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

function ConvertTitle(listGroup) {
    console.log(listGroup);
    let listHeader = [];
    for (let index = 0; index < listGroup.length; index++) {
        const formattedStrings = listGroup[index].replace(/^_/, '').replace("_", " ");
        const resultString = formattedStrings.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        listHeader = [...listHeader, resultString]
    }
    return listHeader;
}

const TableComponent = (props) => {
    //props = {tblType, tblTitle, tblHeader, tblData}
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [fomrValue, setFormValue] = React.useState({}); //{combox:"abc", searchText:"def"}
    const [open, setOpen] = React.useState(-1);

    const visibleRows = React.useMemo(
        () =>
            stableSort(props.tblDataString, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );


    if (props.tblType === "ListReport") {
        let jsonKey = [...new Set(props.tblDataString.map(value => Object.keys(value)).flat())];
        jsonKey = jsonKey.filter(value => !props.listInvisible.includes(value));
        let listGroup = [...new Set(props.tblDataString.map(value => value.Group).flat())];

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

        const handleComboboxSelect = (e) => {
            setFormValue({ ...fomrValue, group: e.target.value });
        }


        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.tblDataString.length) : 0;

        return (
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar title="List Group Report" cbcData={listGroup} comboboxSelect={handleComboboxSelect} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
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
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {jsonKey.map(keys =>
                                                <TableCell
                                                    align="left"
                                                    key={keys + index}
                                                    sx={{
                                                        maxWidth: '200px',
                                                        overflowWrap: 'break-word'
                                                    }}
                                                >
                                                    {row[keys]}
                                                </TableCell>
                                            )}
                                            <TableCell align="center">
                                                <ButtonComponent id='btnEdit' btnType="ReportConfig" btnValue="EditNote" btnLabel="Edit" btnClass='btnEdit' />
                                                <ButtonComponent id='btnDelete' btnType="ReportConfig" btnValue="DeleteForever" btnLabel="Delete" btnClass='btnDelete' />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
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
    } else if (props.tblType === "ListReportv2") {
        // thêm các nút cho các btnType khác nhau
        let jsonKey = [...new Set(props.tblDataString.map(value => Object.keys(value)).flat())];
        jsonKey = jsonKey.filter(value => !props.listInvisible.includes(value));
        let listGroup = [...new Set(props.tblDataString.map(value => value.Group).flat())];
        let listHeader = ConvertTitle(jsonKey)

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

        const handleComboboxSelect = (e) => {
            setFormValue({ ...fomrValue, group: e.target.value });
        }


        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.tblDataString.length) : 0;

        return (
            <Box className={style.tableBox} >
                <Paper className={style.tablePaper}>
                    <EnhancedTableToolbar title="List Group Report" cbcData={listGroup} comboboxSelect={handleComboboxSelect} />
                    <TableContainer component={Paper}>
                        <Table
                            className={style.tableMain}
                            aria-labelledby="tableTitle"
                            size='medium'>
                            <EnhancedTableHead
                                headers={listHeader}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={props.tblDataString.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <React.Fragment>
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={index}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    key={index}
                                                    className={style.tableMainCell}
                                                >
                                                    {index + 1}

                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => setOpen(open == index ? -1 : index)}

                                                    >
                                                        {open == index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                {jsonKey.map(keys => {
                                                    if (keys == "_id") {
                                                        return (
                                                            <TableCell
                                                                align="left"
                                                                key={keys + index}
                                                                className={style.tableMainCell}
                                                            >
                                                                {index + 1}

                                                                <IconButton
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={() => setOpen(open == index ? -1 : index)}

                                                                >
                                                                    {open == index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                </IconButton>
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                align="left"
                                                                key={keys + index}
                                                                className={style.tableMainCell}
                                                            >
                                                                {row[keys]}
                                                            </TableCell>
                                                        )
                                                    }
                                                }
                                                )}
                                                <TableCell align="center" >
                                                    <ButtonComponent id='btnEdit' btnType="ReportConfig" btnValue="EditNote" btnLabel="Edit" btnClass='btnEdit' />
                                                    <ButtonComponent id='btnDelete' btnType="ReportConfig" btnValue="DeleteForever" btnLabel="Delete" btnClass='btnDelete' />
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
                                                                        <TableRow key={reportRow._id} className={style.tableSubRow}>
                                                                            <TableCell component="th" scope="row">
                                                                                {reportRow._id}
                                                                            </TableCell>
                                                                            <TableCell>{reportRow.report_name}</TableCell>
                                                                            <TableCell>{reportRow.date_create}</TableCell>
                                                                            <TableCell>
                                                                                {reportRow.description}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <ButtonComponent id='btnEdit' btnType="ReportConfig" btnValue="EditNote" btnLabel="Edit" btnClass='btnEdit' />
                                                                                <ButtonComponent id='btnDelete' btnType="ReportConfig" btnValue="DeleteForever" btnLabel="Delete" btnClass='btnDelete' />
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
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}

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
    }

};

export default TableComponent;