<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:output method="xml" omit-xml-declaration="yes" encoding="UTF-8" />
  
  <xsl:template name="menuAdmin">
    <h1><xsl:value-of select="/data/lang/a_t_administration" /></h1>
    <table>
      <tr>
        <td>
          <form method="POST" action="a.institutions"><a href="#" onclick="request(this)"><xsl:value-of select="/data/lang/a_t_banques" /></a></form>
        </td>
        <td>
          <form method="POST" action="a.servicescst"><a href="#" onclick="request(this)"><xsl:value-of select="/data/lang/a_t_prestationset" /></a></form>
        </td>
        <td>
          <form method="POST" action="a.services"><a href="#" onclick="request(this)"><xsl:value-of select="/data/lang/a_t_prestation" /></a></form>
        </td>
        <td>
          <form method="POST" action="u.logout"><a href="#" onclick="request(this)">Logout</a></form>
        </td>
      </tr>
    </table>
  </xsl:template>
</xsl:stylesheet>