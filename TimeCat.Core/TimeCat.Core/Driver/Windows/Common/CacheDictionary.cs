using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;

namespace TimeCat.Core.Driver.Windows.Common
{
    public static class CacheDictionary
    {
        static Dictionary<string, string> _cacheDictionary = new Dictionary<string, string>();

        public static string Get(string fullPath)
        {
            Reload();
            if (_cacheDictionary.TryGetValue(fullPath, out string value))
                return value;

            return null;
        }

        public static bool HasIcon(string fullPath)
        {
            Reload();
            return _cacheDictionary.ContainsKey(fullPath.ToLower());
        }   

        public static void Set(string fullPath, string iconPath) 
        {
            _cacheDictionary[fullPath.ToLower()] = iconPath;
            WriteTo();
        }


        private static void Reload()
        {
            var dic = new Dictionary<string, string>();
            try
            {
                using (XmlReader rd = XmlReader.Create(Path.Combine(EnvironmentSupport.Cache, "CacheDictionary.xml")))
                {
                    while (rd.Read())
                    {
                        if (rd.IsStartElement())
                        {
                            if (rd.Name == "IconSet")
                            {
                                rd.Read();
                                string file = rd.ReadElementContentAsString("File", "");
                                string icon = rd.ReadElementContentAsString("Icon", "");

                                dic[file] = icon;
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                return;
            }

            _cacheDictionary = dic;
        }

        private static void WriteTo()
        {
            using (XmlWriter wr = XmlWriter.Create(Path.Combine(EnvironmentSupport.Cache, "CacheDictionary.xml")))
            {
                wr.WriteStartDocument();
                wr.WriteStartElement("Icons");

                foreach (var itm in _cacheDictionary)
                {
                    wr.WriteStartElement("IconSet");
                    wr.WriteElementString("File", itm.Key);
                    wr.WriteElementString("Icon", itm.Value);
                    wr.WriteEndElement();
                }

                wr.WriteEndElement();
                wr.WriteEndDocument();
            }

        }
    }
}
