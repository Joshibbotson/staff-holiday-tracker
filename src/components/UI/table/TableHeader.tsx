import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    OutlinedInput,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SCSS from "./tableHeader.module.scss";
import { nanoid } from "nanoid";

interface Props {
    title: string | null;
    columnNames: string[];
    showFilter: boolean;
    filterOptions: string[];
    handleChange: (event: SelectChangeEvent<string[]>) => void;
    currentFilters: string[];
}

const TableHeader = ({
    title,
    columnNames,
    showFilter,
    filterOptions,
    handleChange,
    currentFilters,
}: Props) => {
    return (
        <thead className={SCSS.tableHead}>
            <tr>
                {showFilter ? (
                    <th colSpan={2}>
                        <FormControl
                            sx={{
                                m: 1,
                                width: 400,
                                backgroundColor: "white",
                                borderRadius: "4px",
                            }}
                        >
                            <InputLabel>
                                <FilterListIcon /> Filters
                            </InputLabel>
                            <Select
                                multiple
                                value={currentFilters}
                                onChange={handleChange}
                                input={<OutlinedInput label="Filter" />}
                                renderValue={selected => selected.join(", ")}
                            >
                                {filterOptions.map(filter => (
                                    <MenuItem key={filter} value={filter}>
                                        <Checkbox
                                            checked={
                                                currentFilters.indexOf(filter) >
                                                -1
                                            }
                                        />
                                        <ListItemText primary={filter} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </th>
                ) : (
                    ""
                )}

                <th colSpan={5} className={SCSS.requestTable__title}>
                    {title}
                </th>
            </tr>
            <tr className={SCSS.requestTable__header}>
                {columnNames.map((column: string) => {
                    return (
                        <th colSpan={1} key={nanoid()}>
                            {column}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
