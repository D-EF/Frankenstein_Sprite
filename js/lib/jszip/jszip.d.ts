/**

JSZip - A Javascript class for generating Zip files
<//jszip.stuartk.co.uk>

(c) 2009 Stuart Knightley <stuart [at] stuartk.co.uk>
Licenced under the GPLv3 and the MIT licences

Usage:
   zip = new JSZip();
   zip.add("hello.txt", "Hello, World!").add("tempfile", "nothing");
   zip.folder("images").add("smile.gif", base64Data, {base64: true});
   zip.add("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

export class JSZip{
    
    // default : no compression
    compression : string;
    files : any[];

    // Where we are in the hierarchy
    root : string;

    // Default properties for a new file
    d : {
        base64: boolean,
        binary: boolean,
        dir: boolean,
        date?: Date
    };

    constructor(compression:any);


    /** Add a file to the zip file
     * @param   name  The name of the file
     * @param   data  The file data, either raw or base64 encoded
     * @param   o     File options
     * @return  this JSZip object
     */
    add(name, data, o);

    /** Add a directory to the zip file
     * @param   name  The name of the directory to add
     * @return  JSZip object with the new directory as the root
     */
    folder(name);

    /** Compare a string or regular expression against all of the filenames and
     * return an informational object for each that matches.
     * @param   string/regex The regular expression to test against
     * @return  An array of objects representing the matched files. In the form
     *          {name: "filename", data: "file data", dir: true/false}
     */
    find(needle);

    /** Delete a file, or a directory and all sub-files, from the zip
     * @param   name  the name of the file to delete
     * @return  this JSZip object
     */
    remove(name);

    /** Generate the complete zip file
     * @return  A base64 encoded string of the zip file
     */
    generate(asBytes);

    // Utility functions

    decToHex(dec, bytes);

    /** 
    *  Javascript crc32
    *  //www.webtoolkit.info/
    *
    **/

    crc32(str, crc);

    // Inspired by //my.opera.com/GreyWyvern/blog/show.dml/1725165
    clone();

    utf8encode(input);

    /*
    * Compression methods
    * This object is filled in as follow :
    * name : {
    *    magic // the 2 bytes indentifying the compression method
    *    compress // function, take the uncompressed content and return it compressed.
    * }
    *
    * STORE is the default compression method, so it's included in this file.
    * Other methods should go to separated files : the user wants modularity.
    */
    static compressions:{
        [key:string]:{
            magic: string,
            compress: ()=>any
        }
    }
}


interface cnm{
    encode:(input, utf8)=>string;
    decode:(input, utf8)=>string;
}
 
/** 
*  Base64 encode / decode
*  //www.webtoolkit.info/
*
*  Hacked so that it doesn't utf8 en/decode everything
**/

export function EnDe_Code():cnm;
