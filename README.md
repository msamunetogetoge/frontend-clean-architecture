# フロントエンドにクリーンアーキテクチャを適用してみる

- /src  
  - /domain  
      - /entities  
  - /useCases  
  - /interfaceAdapters
      - /components  
      ^ /api  

## Domain (Entities): これはアプリケーションのビジネスロジックを含むコアレイヤーで、ドメインモデル、エンティティ、値オブジェクト、ドメインサービス、ビジネスルールなどを定義します。ここでは、マスタデータ、データクレンジングルール、バッチジョブ設定、検索クエリ、検索結果などのエンティティを定義します。

## Use Cases (Application Business Rules): このレイヤーでは、エンティティを操作するためのアプリケーション固有のビジネスロジックを定義します。例えば、マスタデータのCRUD操作、データクレンジング、データ検索と分析、バッチ処理の設定と実行などのユースケースを定義します。

## Interface Adapters: このレイヤーでは、エンティティとユースケースのデータをユーザインターフェースや外部システムとの間で変換するアダプターを定義します。これには、データベースへのデータのマッピング（リポジトリ）、HTTPリクエストとレスポンスの変換（コントローラ）、データ表示の形式の変換（ビュー）、外部APIへの接続（ゲートウェイ）などが含まれます。

