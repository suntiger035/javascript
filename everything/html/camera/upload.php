<?php
    function convert_data($data, $str){  
        $image = base64_decode( str_replace('data:image/jpeg;base64,', '',$data));  
        save_to_file($str, $image); 
		return true; 
    }  
    function save_to_file($filename, $image){     
        $fp = fopen($filename, 'w');  
        fwrite($fp, $image);  
        fclose($fp);  
    }
	
	$rand = rand().'.png';
	$ret = array();
	$ret["ss"] = $_SERVER;
	if(convert_data($_POST["data"], $rand)){
		
		$ret["src"] = 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']).'/'.$rand;
		$ret["errmsg"] = "上传成功";
		$ret["errorcode"] = 0; 	
	}else{
		$ret["src"] = '';
		$ret["errmsg"] = "上传失败";
		$ret["errorcode"] = 1; 			
	}
	
	echo json_encode( $ret );
	
?>