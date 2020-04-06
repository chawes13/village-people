import React from 'react'

// Note: this component is only used for providing example markup to the styleguide. 
// Do not import it directly into the application.

function Typography () {
  return (
    <div>
      <table className="styleguide-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tr>
          <td><xmp>h1</xmp></td>
          <td><h1>The quick brown fox jumps over the lazy dog</h1></td>
        </tr>
        <tr>
          <td><xmp>h2</xmp></td>
          <td><h2>The quick brown fox jumps over the lazy dog</h2></td>  
        </tr>
        <tr>
          <td><xmp>h3</xmp></td>
          <td><h3>The quick brown fox jumps over the lazy dog</h3></td>  
        </tr>
        <tr>
          <td><xmp>h4</xmp></td>
          <td><h4>The quick brown fox jumps over the lazy dog</h4></td> 
        </tr>
        <tr>
          <td><xmp>h5</xmp></td>
          <td><h5>The quick brown fox jumps over the lazy dog</h5></td>  
        </tr>
        <tr>
          <td><xmp>h6</xmp></td>
          <td><h6>The quick brown fox jumps over the lazy dog</h6></td>
        </tr>
        <tr>
          <td><xmp>p</xmp></td>
          <td><p>The quick brown fox jumps over the lazy dog</p></td>
        </tr>
        <tr>
          <td><xmp>a</xmp></td>
          <td><a>The quick brown fox jumps over the lazy dog</a></td>      
        </tr>
      </table> 
    </div>
)
}

export default Typography