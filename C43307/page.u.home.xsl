<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" omit-xml-declaration="yes" encoding="UTF-8" />
  <xsl:template match="/">
    <out>
      <h1>Login</h1>
      
      <form method="POST" action="u.login">
        <table>
          <tr>
            <th>Username</th>
            <td><input type="text" name="u" /></td>
          </tr>
          <tr>
            <th>Password</th>
            <td><input type="password" name="p" /></td>
          </tr>
          <tr>
            <th> </th>
            <td><input type="button" value="Login" onclick="request(this)"/></td>
          </tr>
        </table>
      </form>
    </out>
  </xsl:template>
</xsl:stylesheet>