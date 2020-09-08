param($imagePath)

# Adapted from https://github.com/octan3/img-clipboard-dump/blob/master/dump-clipboard-png.ps1

Add-Type -Assembly PresentationCore

# Use raw PNG if present
[IO.Stream] $pngStream = $null;
[IO.Stream] $ngOutStream = $null;
try {
    [System.Windows.DataObject] $retrievedData = [Windows.Clipboard]::GetDataObject();
    if ($null -ne $retrievedData -and $retrievedData.GetDataPresent('PNG'))
    {
        $pngStream = $retrievedData.GetData('PNG');
        $ngOutStream = [IO.File]::Open($imagePath, "OpenOrCreate")
        $pngStream.CopyTo($ngOutStream);
        if (Test-Path $imagePath)
        {
            $imagePath
            Exit 0
        }
    }
}
catch {

}
finally {
    if ($null -ne $pngStream)
    {
        $pngStream.Dispose();
    }
    if ($null -ne $ngOutStream)
    {
        $ngOutStream.Flush();
        $ngOutStream.Dispose();
    }
}


[System.Windows.Interop.InteropBitmap] $img = [Windows.Clipboard]::GetImage()

if ($img -eq $null) {
    "no image"
    Exit 1
}

if (-not $imagePath) {
    "no image"
    Exit 1
}

$fcb = New-Object Windows.Media.Imaging.FormatConvertedBitmap($img, [Windows.Media.PixelFormats]::Rgb24, $null, 0)
$stream = [IO.File]::Open($imagePath, "OpenOrCreate")
$encoder = New-Object Windows.Media.Imaging.PngBitmapEncoder
$encoder.Frames.Add([Windows.Media.Imaging.BitmapFrame]::Create($fcb)) | out-null
$encoder.Save($stream) | out-null
$stream.Dispose() | out-null

$imagePath