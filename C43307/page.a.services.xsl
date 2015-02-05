<?xml version="1.0" encoding="UTF-8" ?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" omit-xml-declaration="yes" encoding="UTF-8" />
  
  <xsl:include href="common.xsl" />
  
  <xsl:template match="/">
    <out>
      <xsl:call-template name="menuAdmin" />
      
      <h1><xsl:value-of select="/data/lang/a_t_prestation" /></h1>
      
      <table>
        <tbody>
          <xsl:for-each select="/data/institutions/item">
            <xsl:sort select="name" />
            <xsl:variable name="instId" select="id" />
            <xsl:variable name="instName" select="name" />
            <tr>
              <th colspan="6" class="lvl1"><xsl:value-of select="$instName" /></th>
            </tr>
        
            <xsl:for-each select="/data/servicescst/item">
              <xsl:sort select="name" />
              <xsl:variable name="servId" select="id" />
              <xsl:variable name="servName" select="name" />
              <tr>
                <th colspan="6" class="lvl2"><xsl:value-of select="$servName" /></th>
              </tr>
              
              <xsl:choose>
                <xsl:when test="count(/data/services/item[service=$servId and institution=$instId]) &gt; 0">
                  <tr>
                    <th><xsl:value-of select="/data/lang/a_c_id" /></th>
                    <th><xsl:value-of select="/data/lang/a_c_duree" /></th>
                    <th><xsl:value-of select="/data/lang/a_c_montant" /></th>
                    <th><xsl:value-of select="/data/lang/a_c_taux" /></th>
                    <th><xsl:value-of select="/data/lang/a_c_text" /></th>
                    <th> </th>
                  </tr>
                  <xsl:for-each select="/data/services/item[service=$servId and institution=$instId]">
                    <xsl:sort select="rate" data-type="number"/>
                    <tr>
                      <td><xsl:value-of select="id" /></td>
                      <td>
                        <table class="ghost">
                          <tr>
                            <td>
                              <form method="POST" action="a.services.edit">
                                <input type="hidden" name="id" value="{id}"/>
                                <input type="text" name="dmin" value="{min_duration}" onblur="request(this)" size="2" /> <xsl:value-of select="/data/lang/a_c_a" />
                              </form>
                            </td>
                            <td>
                              <form method="POST" action="a.services.edit">
                                <input type="hidden" name="id" value="{id}"/>
                                <input type="text" name="dmax" value="{max_duration}" onblur="request(this)" size="2" /> <xsl:value-of select="/data/lang/a_c_mois" />
                              </form>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="ghost">
                          <tr>
                            <td>
                              <form method="POST" action="a.services.edit">
                                <input type="hidden" name="id" value="{id}"/>
                                <input type="text" name="mmin" value="{min_amount}" onblur="request(this)" size="5" /> <xsl:value-of select="/data/lang/a_c_a" />
                              </form>
                            </td>
                            <td>
                              <form method="POST" action="a.services.edit">
                                <input type="hidden" name="id" value="{id}"/>
                                <input type="text" name="mmax" value="{max_amount}" onblur="request(this)" size="5" /> <xsl:value-of select="/data/lang/a_c_eur" />
                              </form>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <form method="POST" action="a.services.edit">
                          <input type="hidden" name="id" value="{id}"/>
                          <input type="text" name="r" value="{rate}" onblur="request(this)" size="5" /> <xsl:value-of select="/data/lang/a_c_pourcent" />
                        </form>
                      </td>
                      <td>
                        <form method="POST" action="a.services.edit">
                          <input type="hidden" name="id" value="{id}"/>
                          <input type="text" name="info" value="{info}" onblur="request(this)" size="50"/>
                        </form>
                      </td>
                      <th>
                        <form method="POST" action="a.services.delete">
                          <input type="hidden" value="{id}" name="id"/>
                          <div class="delete" onclick="if(confirm('Etes-vous certain de vouloir supprimer cette entr&#233;e?')) request(this)">&#160;</div>
                        </form>
                      </th>
                    </tr>
                  </xsl:for-each>
                </xsl:when>
                <xsl:otherwise>
                  <tr><td colspan="5" class="center"><xsl:value-of select="/data/lang/a_c_nomatch" /></td></tr>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:for-each>
          </xsl:for-each>
        </tbody>
      </table>  
      
      <h1><xsl:value-of select="/data/lang/a_t_prestation" /></h1>
      <form method="POST" action="a.services.add">
        <table>
          <tr>
            <th><xsl:value-of select="/data/lang/a_c_id" /></th>
            <td>#</td>
          </tr>
          <tr>
            <th><xsl:value-of select="/data/lang/a_c_banque" /></th>
            <td>
              <select name="i">
                <xsl:for-each select="/data/institutions/item">
                  <xsl:sort select="name" />
                  <option value="{id}"><xsl:value-of select="name"/></option>
                </xsl:for-each>
              </select>
            </td>
          </tr>
          <tr>
            <th><xsl:value-of select="/data/lang/a_c_prestation" /></th>
            <td>
              <select name="s">
                <xsl:for-each select="/data/servicescst/item">
                  <xsl:sort select="name" />
                  <option value="{id}"><xsl:value-of select="name"/></option>
                </xsl:for-each>
              </select>
            </td>
          </tr>
          <tr>
            <th><xsl:value-of select="/data/lang/a_c_duree" /></th>
            <td>
              <input type="text" size="2" name="dmin" /> <xsl:value-of select="/data/lang/a_c_a" />
              <input type="text" size="2" name="dmax" /> <xsl:value-of select="/data/lang/a_c_mois" />
            </td>
          </tr>
          <tr>
            <th><xsl:value-of select="/data/lang/a_c_montant" /></th>
            <td>
              <input type="text" size="5" name="mmin" /> <xsl:value-of select="/data/lang/a_c_a" />
              <input type="text" size="5" name="mmax" /> <xsl:value-of select="/data/lang/a_c_eur" />
            </td>
          </tr>
          <tr>
            <th><xsl:value-of select="/data/lang/a_c_taux" /></th>
            <td>
              <input type="text" size="2" name="r" /> <xsl:value-of select="/data/lang/a_c_pourcent" />
            </td>
          </tr>
          <tr>
            <td colspan="2" class="center"><div class="add" onclick="request(this)">&#160;</div></td>
          </tr>
        </table>
      </form>
      <script>
        $('.add').button({
          icons: { primary: "ui-icon-circle-plus"},
          text: false
        });
        $('.delete').button({
          icons: { primary: "ui-icon-circle-close"},
          text: false
        });
      </script>
    </out>
  </xsl:template>
</xsl:stylesheet>