import React from 'react'

// Note: this component is only used for providing example markup to the styleguide. 
// Do not import it directly into the application.

function Buttons () {
  return (
    <div>
      <table className="styleguide-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Default</th>
            <th><xmp>in-progress</xmp></th>
            <th><xmp>is-disabled</xmp></th>
            <th><xmp>button-small</xmp></th>
          </tr>
        </thead>
          <tr>
            <td><xmp>button-primary</xmp></td>
            <td>
              <button className="button-primary">Submit</button>
            </td>
            <td>
              <button className="button-primary in-progress">Submit</button>
            </td>
            <td>
              <button className="button-primary is-disabled">Submit</button>
            </td>
            <td>
              <button className="button-primary button-small">Submit</button>
            </td>
          </tr>
          <tr>
            <td><xmp>button-primary-outline</xmp></td>
            <td>
              <button className="button-primary-outline">Submit</button>
            </td>
            <td>
              <button className="button-primary-outline in-progress">Submit</button>
            </td>
            <td>
              <button className="button-primary-outline is-disabled">Submit</button>
            </td>
            <td>
              <button className="button-primary-outline button-small">Submit</button>
            </td>
          </tr>
          <tr>
            <td><xmp>button-secondary</xmp></td>
            <td>
              <button className="button-secondary">Submit</button>
            </td>
            <td>
              <button className="button-secondary in-progress">Submit</button>
            </td>
            <td>
              <button className="button-secondary is-disabled">Submit</button>
            </td>
            <td>
              <button className="button-secondary button-small">Submit</button>
            </td>
          </tr>
          <tr>
            <td><xmp>button-secondary-outline</xmp></td>
            <td>
              <button className="button-secondary-outline">Submit</button>
            </td>
            <td>
              <button className="button-secondary-outline in-progress">Submit</button>
            </td>
            <td>
              <button className="button-secondary-outline is-disabled">Submit</button>
            </td>
            <td>
              <button className="button-secondary-outline button-small">Submit</button>
            </td>
          </tr>
          <tr>
            <td><xmp>button-warn</xmp></td>
            <td>
              <button className="button-warn">Submit</button>
            </td>
            <td>
              <button className="button-warn in-progress">Submit</button>
            </td>
            <td>
              <button className="button-warn is-disabled">Submit</button>
            </td>
            <td>
              <button className="button-warn button-small">Submit</button>
            </td>
          </tr>
          <tr>
            <td><xmp>button-warn-outline</xmp></td>
            <td>
              <button className="button-warn-outline">Submit</button>
            </td>
            <td>
              <button className="button-warn-outline in-progress">Submit</button>
            </td>
            <td>
              <button className="button-warn-outline is-disabled">Submit</button>
            </td>
            <td>
              <button className="button-warn-outline button-small">Submit</button>
            </td>
          </tr>
      </table>
    </div>
  )
}

export default Buttons
