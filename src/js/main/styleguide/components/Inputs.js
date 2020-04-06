import React from 'react'

// Note: this component is only used for providing example markup to the styleguide. 
// Do not import it directly into the application.

function Inputs () {
  return (
    <div>
      <table className="styleguide-table inputs">
        <thead>
          <tr>
            <th>Type</th>
            <th>Default</th>
            <th>Filled</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><xmp>Text</xmp></td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="input-wrapper">
                  <input type="text" name="" placeholder="Placeholder Text" />
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="input-wrapper">
                  <input type="text" name="" placeholder="Placeholder Text" value="John Smith" />
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="error">
                <label>Label</label>
                <div className="input-wrapper">
                  <input type="text" name="" placeholder="Placeholder Text" />
                </div>
                <span className="error-message">Label can't be blank</span>
              </fieldset>
            </td>
          </tr>
          <tr>
            <td><xmp>Textarea</xmp></td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="input-wrapper">
                  <textarea name="message" placeholder="Placeholder Text"></textarea>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="input-wrapper">
                  <textarea name="message" placeholder="Placeholder Text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin vel sit amet, consectetur adipiscing elit.</textarea>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="error">
                <label>Label</label>
                <div className="input-wrapper">
                  <textarea name="message" placeholder="Placeholder Text"></textarea>
                </div>
                <span className="error-message">Label can't be blank</span>
              </fieldset>
            </td> 
          </tr>
          <tr>
            <td><xmp>Select</xmp></td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="input-wrapper">
                  <select name="time">
                    <option value="select">Select</option>
                    <option value="afternoon">Option 1</option>
                    <option value="evening">Option 2</option>
                  </select>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="input-wrapper">
                  <select name="time">
                    <option value="select" disabled>Select</option>
                    <option value="afternoon">Option 1</option>
                    <option value="evening">Option 2</option>
                  </select>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="error">
                <label>Label</label>
                <div className="input-wrapper">
                  <select name="time">
                    <option value="select">Select</option>
                    <option value="afternoon">Option 1</option>
                    <option value="evening">Option 2</option>
                  </select>
                </div>
                <span className="error-message">Label can't be blank</span>
              </fieldset>
            </td> 
          </tr>
          <tr>
            <td><xmp>Checkbox</xmp></td>
            <td>
              <fieldset className="checkbox">
                <div className="input-wrapper">
                  <input type="checkbox" id="checkbox1" value="true" />
                  <label htmlFor="checkbox1">Checkbox label</label>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="checkbox">
                <div className="input-wrapper">
                  <input type="checkbox" id="checkbox2" checked="checked" value="true" />
                  <label htmlFor="checkbox2">Checkbox label</label>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="checkbox error">
                <div className="input-wrapper">
                  <input type="checkbox" id="checkbox3" value="true" />
                  <label htmlFor="checkbox3">Checkbox label</label>
                </div>
                <span className="error-message">Label can't be blank</span>
              </fieldset>
            </td> 
          </tr>
          <tr>
            <td><xmp>Radio</xmp></td>
            <td>
              <fieldset className="radio-inputs">
                <label className="label-input" htmlFor="radio-name">Label</label>
                <div className="input-wrapper">
                  <label className="radio-input">
                    <input type="radio" value="true" name="radio-name1" /><span>Yes <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>
                  </label>
                  <label className="radio-input">
                    <input type="radio" value="false" name="radio-name1" /><span>No <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>
                  </label>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="radio-inputs">
                <label className="label-input" htmlFor="radio-name">Label</label>
                <div className="input-wrapper">
                  <label className="radio-input">
                    <input type="radio" value="true" name="radio-name2" checked="checked" /><span>Yes <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>
                  </label>
                  <label className="radio-input">
                    <input type="radio" value="false" name="radio-name2" /><span>No <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>
                  </label>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="radio-inputs error">
                <label className="label-input" htmlFor="radio-name">Label</label>
                <div className="input-wrapper">
                  <label className="radio-input">
                    <input type="radio" value="true" name="radio-name3" /><span>Yes <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>
                  </label>
                  <label className="radio-input">
                    <input type="radio" value="false" name="radio-name3" /><span>No <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></span>
                  </label>
                  <span className="error-message">Label can't be blank</span>
                </div>
              </fieldset>
            </td> 
          </tr>
          <tr>
            <td><xmp>Radio Buttons</xmp></td>
            <td>
              <fieldset className="radio-buttons">
                <label className="label-input" htmlFor="radio-name">Label</label>
                <div className="input-wrapper">
                  <div className="row">
                    <label className="radio-button">
                      <input type="radio" value="true" name="radio-name4" /><span>Yes</span>
                    </label>
                    <label className="radio-button">
                      <input type="radio" value="false" name="radio-name4" /><span>No</span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="radio-buttons">
                <label className="label-input" htmlFor="radio-name">Label</label>
                <div className="input-wrapper">
                  <div className="row">
                    <label className="radio-button">
                      <input type="radio" value="true" name="radio-name5" checked="checked" /><span>Yes</span>
                    </label>
                    <label className="radio-button">
                      <input type="radio" value="false" name="radio-name5" /><span>No</span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </td>
            <td>
              <fieldset className="radio-buttons error">
                <label className="label-input" htmlFor="radio-name">Label</label>
                <div className="input-wrapper">
                  <div className="row">
                    <label className="radio-button">
                      <input type="radio" value="true" name="radio-name6" /><span>Yes</span>
                    </label>
                    <label className="radio-button">
                      <input type="radio" value="false" name="radio-name6" /><span>No</span>
                    </label>
                  </div>
                  <span className="error-message">Label can't be blank</span>
                </div>
              </fieldset>
            </td> 
          </tr>
          <tr>
            <td><xmp>File Upload</xmp></td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="fileupload fileupload-new" data-provides="fileupload">
                   <span className="button-secondary-light">
                     <span className="fileupload-new">Select File</span>
                     <span className="fileupload-exists">Change</span>
                      <input type="file" name="fileToUpload" id="fileToUpload" />
                   </span>
                   <span className="fileupload-preview"></span>
                   <a href="#" className="close fileupload-exists" data-dismiss="fileupload">×</a>
                 </div>
              </fieldset>      
            </td>
            <td>
              <fieldset>
                <label>Label</label>
                <div className="fileupload fileupload-exists" data-provides="fileupload">
                   <span className="button-secondary-light">
                     <span className="fileupload-new">Select File</span>
                     <span className="fileupload-exists">Change</span>
                      <input type="file" name="fileToUpload" id="fileToUpload" />
                   </span>
                   <span className="fileupload-preview">File Name Preview</span>
                   <a href="#" className="close fileupload-exists" data-dismiss="fileupload" >×</a>
                 </div>
              </fieldset>        
            </td>
            <td>
              <fieldset className="error">
                <label>Label</label>
                <div className="fileupload fileupload-new" data-provides="fileupload">
                   <span className="button-secondary-light">
                     <span className="fileupload-new">Select File</span>
                     <span className="fileupload-exists">Change</span>
                      <input type="file" name="fileToUpload" id="fileToUpload" />
                   </span>
                   <span className="fileupload-preview"></span>
                   <a href="#" className="close fileupload-exists" data-dismiss="fileupload">×</a>
                 </div>
                 <span className="error-message">Label can't be blank</span>
              </fieldset>      
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Inputs