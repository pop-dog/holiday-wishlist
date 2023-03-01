import React from 'react'
import PropTypes from 'prop-types'

const Grid = ({data, columns}) => {
  return (

    <table className="min-w-full">
        <thead className="border-b">
            <tr>
                {columns.map((column) =>
                    (
                        <th key={column.name} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            {column.name}
                        </th>
                    )
                )}
            </tr>
        </thead>
        <tbody>
            {data.map((row) =>
            (
                <tr  key={'row_' + data.indexOf(row)} className="border-b">
                    {columns.map((column) =>
                        (
                            <td key={column.name + '_' + data.indexOf(row)} scope="col" className="text-sm text-gray-900 px-6 py-4 text-left">
                                {column.selector(row)}
                            </td>
                        )
                    )}
                </tr>
            )
            )}
        </tbody>
    </table>
  )
}

Grid.defaultProps = {
    data: []
}

Grid.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        selector: PropTypes.func.isRequired
    })).isRequired
}

export default Grid