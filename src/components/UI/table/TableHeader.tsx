const TableHeader = ({ title, columnNames }) => {
    return (
        <thead>
            <tr>
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
                            {filters.map(filter => (
                                <MenuItem key={filter} value={filter}>
                                    <Checkbox
                                        checked={
                                            currentFilters.indexOf(filter) > -1
                                        }
                                    />
                                    <ListItemText primary={filter} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </th>
                <th colSpan={5} className={SCSS.requestTable__title}>
                    {title}
                </th>
            </tr>
            <tr className={SCSS.requestTable__header}>
                {columnNames.map((column: string) => {
                    return <th colSpan={1}>{column}</th>;
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
